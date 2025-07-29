import { ArrowRight } from "lucide-react"
import Redirect from "./link"

const SectionHeader = ({ title, subtitle, viewAll, className = "" }) => (
  <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 ${className}`}>
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
    </div>
    {viewAll && (
      <Redirect
        to={viewAll}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
      >
        <span>View All</span>
        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
      </Redirect>
    )}
  </div>
)

export default SectionHeader
