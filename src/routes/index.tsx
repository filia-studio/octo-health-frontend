import DashboardOverview from '@/pages/dashboard/overview'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview />} />
    </Routes>
  )
}

export default AppRouter
