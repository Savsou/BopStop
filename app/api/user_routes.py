from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from app.aws_helpers import get_unique_filename, update_file_on_s3
from app.forms import EditProfileForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

#Get Current User
@user_routes.route('/session')
@login_required
def sessionUser():
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401

#Delete Current User
@user_routes.route('/me', methods=['DELETE'])
@login_required
def delete_current_user():
    User.query.filter(User.id == current_user.id).delete()

    db.session.commit()
    return {"message": "User deleted successfully."}, 204


#Edit Current User
@user_routes.route('/session', methods=['PUT'])
@login_required
def edit_current_user():
    form = EditProfileForm()

    form["csrf_token"].data = request.cookies.get("csrf_token")

    if form.validate_on_submit():

        current_user.artistName = form.artistName.data
        current_user.bio = form.bio.data

        original_profile_url = current_user.profileImageUrl
        original_banner_url = current_user.bannerImageUrl

        if 'profileImageUrl' in request.files:
            profileImage = form.profileImageUrl.data
            profileImage.filename = get_unique_filename(profileImage.filename)

            old_profile_url = original_profile_url if original_profile_url != original_banner_url else None
            upload = update_file_on_s3(profileImage, old_image_url=old_profile_url)

            if "url" not in upload:
                return {"errors": upload["errors"]}, 400

            current_user.profileImageUrl = upload["url"]

        if 'bannerImageUrl' in request.files:
            bannerImage = form.bannerImageUrl.data
            bannerImage.filename = get_unique_filename(bannerImage.filename)

            old_banner_url = original_banner_url if original_banner_url != current_user.profileImageUrl else None
            upload = update_file_on_s3(bannerImage, old_image_url=old_banner_url)

            if "url" not in upload:
                return {"errors": upload["errors"]}, 400

            current_user.bannerImageUrl = upload["url"]

        db.session.commit()

        updated_user = {
            "id": current_user.id,
            "artistName": current_user.artistName,
            "bio": current_user.bio,
            "profileImageUrl": current_user.profileImageUrl,
            "bannerImageUrl": current_user.bannerImageUrl
        }

        return {"message": "Profile updated successfully.", "user": updated_user}

    if form.errors:
        return form.errors, 400

    #just in case in other errors
    return {"errors": "Invalid requests"}, 400
