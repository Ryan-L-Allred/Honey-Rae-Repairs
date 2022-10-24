import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {

    let assignedEmployee = null
    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }
    
    let userEmployee = employees.find(employee => employee.userId === currentUser.id)

    return <section className="ticket" key={`ticket--${ticketObject.id}`}>
        <header>
            {
                currentUser
                    ? `Ticket ${ticketObject.id}`
                    : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            }
        </header>
        <section>{ticketObject.description}</section>
        <section>Emergency: {ticketObject.emergency ? "Yes" : "No"}</section>
        <footer>
            {
                ticketObject.employeeTickets.length
                    ? `Currently being worked on ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    : <button onClick={() => {
                            fetch(`http://localhost:8088/employeeTickets`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    employeeId: userEmployee.id,
                                    serviceTicketId: ticketObject.id
                                })
                            })
                                .then(response => response.json())
                                .then(() => {
                                    getAllTickets()
                                })
                        }}>
                        Claim</button>
            }
        </footer>
    </section>
}