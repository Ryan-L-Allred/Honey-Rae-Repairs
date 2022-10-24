import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, assignTicket] = useState({
        description: "",
        emergency: false
    })

    const { ticketId } = useParams()
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
            .then(response => response.json())
            .then((data) => {
                assignTicket(data)
            })
    }, [ticketId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

       // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }



    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        style={{
                            height: "10rem"
                        }}
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.description = evt.target.value
                                assignTicket(copy)
                            }
                        }>{ticket.description}</textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.emergency = evt.target.checked
                                assignTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Edits
            </button>
        </form>
    )
}

        