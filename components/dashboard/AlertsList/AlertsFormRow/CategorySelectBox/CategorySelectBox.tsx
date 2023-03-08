import { useState } from "react";
import { CategoryName } from "shared";
import CategorySelectModal from "../CategorySelectModal";
import SelectLocked from "./SelectLocked";
import SelectUnlocked from "./SelectUnlocked";
export default function CategorySelectBox(props: {
  category: CategoryName | undefined;
  setSelected: (c: CategoryName) => void;
  lockedMode?: boolean;
  alreadySelected?: CategoryName[];
}) {
  const [display, setDisplay] = useState(false);
  const [categorySelected, setCategorySelected] = useState(props.category);
  return (
    <>
      {!props.lockedMode && (
        <SelectUnlocked
          category={props.category}
          onClick={() => {
            if (props.category !== undefined) {
              setCategorySelected(props.category);
            }
            setDisplay(true);
          }}
        />
      )}
      {props.lockedMode && <SelectLocked category={props.category!} />}
      <CategorySelectModal
        selected={categorySelected}
        setSelected={setCategorySelected}
        show={display}
        onClose={() => setDisplay(false)}
        onSubmit={() => {
          setDisplay(false);
          if (categorySelected !== undefined) {
            props.setSelected(categorySelected);
          }
        }}
        alreadySelected={props.alreadySelected}
      />
    </>
  );
}
