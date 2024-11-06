// OpenModalMenuItem.jsx
import { useModal } from '../../context/Modal';

function OpenModalMenuItem({
  modalComponent,
  itemText,
  onItemClick,
  onModalClose,
  buttonClass
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <button onClick={onClick} className={buttonClass}>
      {itemText}
    </button>
  );
}

export default OpenModalMenuItem;
