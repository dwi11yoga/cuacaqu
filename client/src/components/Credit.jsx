// sumber
export default function Credit({ metadata }) {
  return (
    <div className="col-span-2 text-sm italic text-neutral-800">
      <div>
        Data prediksi cuaca diperoleh dari Badan Meteorologi, Klimatologi, dan
        Geofisika
        {metadata
          ? `, dianalisis pada ${metadata.analysisDate.replaceAll(
              ".",
              ":"
            )}`
          : ""}
      </div>
    </div>
  );
}
