
import { Outlet } from 'react-router-dom'


function Dashboard() {
    return (
        <section className='white'>
            <div className="container mx-auto p-3  gap-5">
                

                

                <div className="bg-gray-200/40 font-mono hidden:lg mr-2 shadow-lg">
                    <Outlet/>

                </div>

            </div>
        </section>
    )
}

export default Dashboard
