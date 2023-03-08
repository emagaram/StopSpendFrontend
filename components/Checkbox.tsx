import "./_checkbox.scss";
export default function Checkbox() {
  return (
    <div className="custom-control custom-checkbox mb-5">
      <input
        type="checkbox"
        className="custom-control-input"
        id="customCheck2"
        checked
      />
      <label className="custom-control-label">Or this one</label>
    </div>
  );
}
