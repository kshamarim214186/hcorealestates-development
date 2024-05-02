export default function TextComponent({ itemObj }) {
   return <div dangerouslySetInnerHTML={{ __html: itemObj }} />;
}