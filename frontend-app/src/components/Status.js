import { useState, useEffect }  from 'react';
import '../css/Status.css'
function Status() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [queueStatus, setQueueStatus] = useState([]);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    setInterval(() => setTime(Date.now()), 1000);
    fetch("http://localhost:8080/mail/queue-status")
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true);
                setQueueStatus(data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
  }, [time])

  if (error) {
    return <div>Error: {error.message}</div>;
} else if (!isLoaded) {
    return <div>Loading...</div>;
} else {
    return (
        <div className="Status">
          <table>
            <tr>
              <th>Jobs</th>
              <th>Status</th>
              <th>Mail</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>Active</td>
              <td>{queueStatus.active.jobs}</td>
              <td>Active</td>
              <td>{queueStatus.active.mail}</td>
            </tr>
            <tr>
              <td>Pending</td>
              <td>{queueStatus.pending.jobs}</td>
              <td>Pending</td>
              <td>{queueStatus.pending.mail}</td>
            </tr>
            <tr>
              <td>Completed</td>
              <td>{queueStatus.completed.jobs}</td>
              <td>Completed</td>
              <td>{queueStatus.completed.mail}</td>
            </tr>
          </table>
        </div>
      );
//   return (
//     <>
//       <div>
//         <div>Jobs Status</div>
//         <div>Active jobs: {queueStatus.active.jobs} </div>
//         <div>Pending jobs: {queueStatus.pending.jobs} </div>
//         <div>Completed jobs: {queueStatus.completed.jobs} </div>
//       </div>
//       <div>
//       <div>Mail Status</div>
//         <div>Active mail: {queueStatus.active.mail} </div>
//         <div>Pending mail: {queueStatus.pending.mail} </div>
//         <div>Completed mail: {queueStatus.completed.mail} </div>
//       </div>
//     </>
//     );
}

}

export default Status;