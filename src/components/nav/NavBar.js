import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

	if (honeyUserObject.staff) {
		// Return employee Nav
		return <EmployeeNav />
	}
	else {
		// Return customer Nav
		return <CustomerNav />
	}

}

    

