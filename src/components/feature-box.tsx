export default function FeatureBox({
  title,
  description,
  imgSrc,
  imgLeft = true,
}: {
  title: string;
  description: string;
  imgSrc: string;
  imgLeft?: boolean;
}) {
  return (
    <div className="p-6 glass grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
      <div className={`col-span-5 order-1 ${imgLeft ? "md:order-2" : "md:order-1"}`}>
        <p className="text-3xl text-white font-semibold !mb-3">{title}</p>
        <p className="text-gray-300">{description}</p>
      </div>
      <img
        src={imgSrc}
        alt="Feature Image"
        className={`rounded-lg col-span-7 border border-neutral-800 order-2 ${imgLeft ? "md:order-1" : "md:order-2"}`}
      />
    </div>
  );
}
