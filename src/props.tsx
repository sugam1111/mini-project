// type ButtonProps = {
//   onClick : () => void;
// }


function Props({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}>click me</button>
  )
}

export default Props