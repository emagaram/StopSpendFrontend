import { Button, Modal } from "react-bootstrap";
import { CategoriesListNames, CategoryName } from "shared";
import useDeviceDetect from "../../../../utils/useDeviceDetect";
import CategorySelectList from "./CategorySelectList";
export default function CategorySelectModal(props: {
  show: boolean;
  selected: CategoryName | undefined;
  setSelected: (c: CategoryName) => void;
  onClose: () => void;
  onSubmit: () => void;
  alreadySelected?: CategoryName[];
}) {
  const { isMobile } = useDeviceDetect();

  //Todo, does this do anything?
  // useEffect(() => {
  //   return () => {
  //     setSelected(props.selected)
  //   }
  // }, [])

  return (
    <Modal
      show={props.show}
      onHide={props.onClose}
      // fullscreen={"sm-down"}
      animation={!isMobile}
      centered
    >
      <Modal.Header className="px-4" closeButton>
        {/* <Button>Hi</Button> */}
        <Modal.Title className="ms-auto">Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CategorySelectList
          categoryListNames={CategoriesListNames.filter(
            (cln) => cln.broadCategory !== "Other"
          )}
          selected={props.selected}
          setSelected={props.setSelected}
          onSubmit={props.onSubmit}
          alreadySelected={props.alreadySelected}
        />
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          onClick={props.onSubmit}
          size="lg"
          className="w-100 h-100 m-0"
          variant="primary"
        >
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
