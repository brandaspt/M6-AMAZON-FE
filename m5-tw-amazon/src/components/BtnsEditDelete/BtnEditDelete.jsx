import { MdEdit } from "react-icons/md"
import { RiDeleteBinLine } from "react-icons/ri"
import styles from "./btneditdelete.module.css"

const BtnEditDelete = (props) => {
  return (
    <button
      onClick={props.callback}
      className={`${
        props.type === "edit"
          ? styles.edit
          : props.type === "delete"
          ? styles.delete
          : null
      } ${styles.btn} ${props.pushRight && "ml-auto"}`}>
      {props.type === "edit" ? (
        <MdEdit size="25px" />
      ) : props.type === "delete" ? (
        <RiDeleteBinLine size="25px" />
      ) : null}
    </button>
  )
}

export default BtnEditDelete
