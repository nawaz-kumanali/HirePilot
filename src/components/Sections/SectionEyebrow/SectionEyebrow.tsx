import { Sparkles } from "lucide-react"
import "./sectionEyebrow.scss";


const SectionEyebrow: React.FC<{text: string}> = ({text}) => {
  return (
        <div className="section-eyebrow">
            <Sparkles className="sparkle-icon" size={14} />
            <span>{text}</span>
        </div>
  )
}

export default SectionEyebrow;