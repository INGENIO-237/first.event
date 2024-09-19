export default function Loading() {
  return (
    <section className="text-center w-screen h-screen fixed flex justify-center items-center bg-red-500">
      <div className="animate-spin inline-block w-5 h-5 border-t-2 border-b-2 border-gray-700 rounded-full"></div>
    </section>
  );
}
