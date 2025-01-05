import {useState, useEffect} from 'react'
import Header from '../Header'

const JobDetails = ({match}) => {
  const {jobId} = match.params
  const [jobDetails, setJobDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`https://apis.ccbp.in/jobs/${jobId}`)
      .then(response => response.json())
      .then(data => {
        setJobDetails(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [jobId])

  if (loading) return <div data-testid="loader">Loading...</div>
  if (error) return <div>Error: Failed to load job details.</div>

  return (
    <>
      <Header />
      <div>
        <img src={jobDetails.company_logo_url} alt="job details company logo" />
        <h1>{jobDetails.title}</h1>
        <p>{jobDetails.rating}</p>
        <p>{jobDetails.location}</p>
        <p>{jobDetails.employment_type}</p>
        <p>{jobDetails.package_per_annum}</p>
      </div>
    </>
  )
}

export default JobDetails
