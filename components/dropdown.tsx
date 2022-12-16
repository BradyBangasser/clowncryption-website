import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import dropStyles from "../styles/dropdown.module.scss"

const Dropdown = ({ name, display, children = [] }: any) => {

    const id = "dropdown_" + name.toLowerCase().replaceAll(" ", "_")

    if (!Array.isArray(children)) children = [children]

    return (
        <div id={id} className={dropStyles.dropdown}>
            <div className={dropStyles.title}><FontAwesomeIcon className={dropStyles.HAI} icon={faChevronRight} />{name}</div>
            <ul className={dropStyles.dropdownMenu}>
                {(children as string[]).map((val, index) => (<li key={"dropdown_" + id + "_li_" + index} style={{ display }}>{val}</li>))}
            </ul>
        </div>
    )
}

export default Dropdown