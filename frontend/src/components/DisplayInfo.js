import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DisplayInfo({ baseUrl }) {
    const [allData, updateData] = useState([]);

    useEffect(() => fetchData, [])

    async function fetchData() {
        try {
            const data = await (await fetch('/api', { method: "GET", headers: { 'Content-Type': 'application/json', } })).json();
            console.log('api response : ', data);
            updateData(arr => [...data]);
        } catch (err) {
            console.error(err.message);
            alert('Internal server error!');
        }
    }

    return (
        <div className="container mt-3">
            <Link className='btn btn-link' to='/'>&larr; Back</Link>
            <h1>Display Information</h1>
            {
                (allData.length === 0) ?
                    <h3 className='text-center'>No Record found</h3> :
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>last Name</th>
                                    <th>Email</th>
                                    <th>Country</th>
                                    <th>State</th>
                                    <th>City</th>
                                    <th>Gender</th>
                                    <th>DOB</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allData.map(data =>
                                        <tr>
                                            <td>{data.firstName}</td>
                                            <td>{data.lastName}</td>
                                            <td>{data.gmail}</td>
                                            <td>{data.country}</td>
                                            <td>{data.state}</td>
                                            <td>{data.city}</td>
                                            <td>{data.gender}</td>
                                            <td>{data.dob}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
            }

        </div>
    );
}

export default DisplayInfo;
