import classnames from "classnames";
import Form from "react-bootstrap/Form";
import { CategoryName, transformCategoryName } from "shared";
export default function CategorySelectList(props: {
  selected: CategoryName | undefined;
  setSelected: (c: CategoryName) => void;
  onSubmit: () => void;
  categoryListNames: {
    broadCategory: string;
    categories: CategoryName[];
  }[];
  alreadySelected?: CategoryName[];
}) {
  const removedCategories: CategoryName[] = [
    "Fast Food",
    "Restaurants",
    "Beer and Liquor",
    "Bank Overdraft Fees",
    'Department, Discount, and "Super" Stores',
    // "Tobacco and Vape",
    "Vending Machines",
  ];
  return (
    <Form
      onKeyDown={(e) => {
        if (e.key === "Enter" && props.selected) props.onSubmit();
      }}
    >
      {props.categoryListNames.map((item, index) => (
        <div key={`category-select-item-broad-${item.broadCategory}`}>
          <h5>{item.broadCategory}</h5>
          {item.categories
            .filter((cat) => !(removedCategories as string[]).includes(cat))
            .map((name, i) => {
              const disabled = props.alreadySelected?.includes(
                name as CategoryName
              );
              return (
                <Form.Check
                  key={`category-list-check-${i}`}
                  className="ms-0 my-0"
                  id={`radio-${name}`}
                >
                  <Form.Check.Input
                    className={classnames("radio-mac", {
                      "cursor-pointer": !disabled,
                    })}
                    type={"radio"}
                    checked={props.selected === name}
                    disabled={props.alreadySelected?.includes(name)}
                    onChange={(e) => {
                      props.setSelected(e.target.value as CategoryName);
                    }}
                    value={name}
                  />
                  <Form.Check.Label
                    className={classnames("w-100 pb-1", {
                      "cursor-pointer": !disabled,
                    })}
                  >
                    {transformCategoryName(name)}
                  </Form.Check.Label>
                </Form.Check>
              );
            })}
          {index !== props.categoryListNames.length - 1 && (
            <br key={"cat-list-check-br-" + index} />
          )}
        </div>
      ))}
    </Form>
  );
}
