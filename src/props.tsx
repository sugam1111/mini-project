// type ButtonProps = {
//   onClick : () => void;
// }


const Props = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick}>click me</button>
  )
}

export default Props