import CenteredLoadingBars from "./CenteredLoadingBars";
import "./Sass/AccountTables.scss";

interface SubTableProps{
    isLoading: boolean,
    error: {
        state: boolean,
        message: string
    },
    subs: {
        sub_id: string,
        sub_type_id: string,
        sub_name: string, 
        user_id: string,
        purch_date: string,
        renew_date: string, 
        active: boolean,
        price: number
    }[] | never[]
}

const SubTable = (props: SubTableProps)=>{
    
    let { isLoading, error, subs } = props
    
    return(
        <table>
            <thead>
                <tr>
                    <th>Subscription ID</th>
                    <th>Type</th>
                    <th>Rate</th>
                    <th>Active?</th>
                    <th>Purchase Date</th>
                    <th>Renew Date</th>
                </tr>
            </thead>
            {
                isLoading
                ?   <tbody>
                        <CenteredLoadingBars/>
                    </tbody>
                :   <tbody>
                        {
                            error.state
                            ?   <span>{error.message}</span>
                            :   subs.map((element: any, index: number)=>{
                                    return(
                                        <tr key={`sub-table-row-${index}`}>
                                            <td>{element.sub_id}</td>
                                            <td>{element.sub_name}</td>
                                            <td>${element.price}</td>
                                            <td>{element.active ? "Yes" : "No"}</td>
                                            <td>{element.purch_date.slice(0, element.purch_date.indexOf(" "))}</td>
                                            <td>{element.renew_date.slice(0, element.purch_date.indexOf(" "))}</td>
                                        </tr>
                                    )
                                })
                        }
                        {
                            subs.length === 0 && !error.state
                            ? <span>You have no subscriptions yet!</span>
                            : null
                        }
                    </tbody>
            }
        </table>
    )
}

export default SubTable