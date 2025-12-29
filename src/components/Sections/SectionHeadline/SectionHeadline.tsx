import "./sectionHeadline.scss";


const SectionHeadline: React.FC<{ text: string; gradient_text: string }> = ({ text, gradient_text
 }) => {
  return (
    <h2 className="section-headline">
      {text} <span className="text-gradient">{gradient_text}</span>
    </h2>
  )
}

export default SectionHeadline;