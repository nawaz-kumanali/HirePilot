import "./sectionSubHeadline.scss";


const SectionSubHeadline: React.FC<{ text: string }> = ({ text}) => {
  return (
    <p className="section-sub-headline">
      {text}
    </p>
  )
}

export default SectionSubHeadline;