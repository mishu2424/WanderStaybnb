import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import RoomDataRow from '../../../components/Sidebar/TableRows/RoomDataRow';

const ManageBookings = () => {
    const axiosSecure=useAxiosSecure();
    const {user,loading}=useAuth();
    const {data:bookings=[],isLoading,refetch}=useQuery({
        queryKey:['my-listings',user?.email],
        queryFn:async()=>{
            const {data}=await axiosSecure(`/manage-bookings/${user?.email}`);
            return data;
        }
    })

    console.log(bookings);
    
    if(isLoading||loading) return <LoadingSpinner/>;
  return (
    <>
      <Helmet>
        <title>Manage Bookings</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Guest Info
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      From
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      To
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {/* Table row data */}
                    {
                        bookings.map(room=><RoomDataRow key={room?._id} room={room}/>)
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageBookings