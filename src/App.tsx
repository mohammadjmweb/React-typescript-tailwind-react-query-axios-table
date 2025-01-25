import { useQuery } from 'react-query';
import './App.css'
import React from 'react'
import axios from 'axios';

interface User{
    id:number;
    name:string;
    username:string;
    email:string;
}

const fetchUsers=async():
Promise<User[]>=>{
    const {data}=await axios.get('https://jsonplaceholder.typicode.com/users')
    return data
}

const App:React.FC=()=>{
    const {data,error,isLoading}=useQuery<User[],Error>('users',fetchUsers)

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>An error occured: {error.message}</div>
    
    return(
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4' >User List</h1>

            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-300'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='py-2 px-4 border-b'>id</th>
                            <th className='py-2 px-4 border-b'>name</th>
                            <th className='py-2 px-4 border-b'>username</th>
                            <th className='py-2 px-4 border-b'>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(user=>(
                            <tr key={user.id} className='hover:bg-gray-100'>
                                <th className='py-2 px-4 border-b'>{user.id}</th>
                                <th className='py-2 px-4 border-b'>{user.name}</th>
                                <th className='py-2 px-4 border-b'>{user.username}</th>
                                <th className='py-2 px-4 border-b'>{user.email}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default App