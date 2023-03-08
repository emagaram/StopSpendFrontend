import Tzs, { allTimezones, ITimezone } from "react-timezone-select";

export default function TimezoneSelect(props: {
  tz: ITimezone;
  setTz: (it: ITimezone) => void;
}) {
  return (
    <Tzs
      value={props.tz}
      onChange={(i) => {
        props.setTz(i);
      }}
      timezones={{
        ...allTimezones,
        // "America/Lima": "Pittsburgh",
        // "Europe/Berlin": "Frankfurt",
      }}
    />
    //     <div className="App">
    //       <h1>Demo</h1>
    //       <h2>
    //         <code>react-timezone-select</code> + <code>moment</code>
    //       </h2>
    //       <div className="timezone--wrapper">

    //       </div>
    //       <div className="output-wrapper">
    //         <div>
    //           Current Date / Time in{" "}
    //           {typeof tz === "string" ? tz.split("/")[1] : tz.value.split("/")[1]}:{" "}
    //           <pre>{datetime}</pre>
    //         </div>
    //         <div>
    //           <div>Selected Timezone:</div>
    //           <pre>{JSON.stringify(tz, null, 2)}</pre>
    //         </div>
    //       </div>
    //     </div>
  );
}
