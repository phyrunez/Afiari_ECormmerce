import Modal from './Modal';
import { useSelector } from 'react-redux';

const StoresAroundYou = () => {
  const toggleModalState = useSelector(
    (state) => state.stores.toggleModalState
  );
  if (toggleModalState)
    return (
      <Modal>
        <span>This is a modal</span>
      </Modal>
    );
  return <div />;
};

export default StoresAroundYou;
