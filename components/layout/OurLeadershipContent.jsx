"use client";

const residentPastors = [
  {
    name: 'Pastor Seun Oseni',
    title: 'KingsWord Calgary',
    imageUrl: '/assets/res1.webp',
  },
  {
    name: 'Pastor Kunle Mabadeje',
    title: 'KingsWord Calgary',
    imageUrl: '/assets/res3.webp',
  },
  {
    name: 'Pastor Hope Obaido',
    title: 'KingsWord Toronto',
    imageUrl: '/assets/res2.webp',
  },
  {
    name: 'Dr. Taiwo Asiwaju',
    title: 'KingsWord Vancouver',
    imageUrl: '/assets/res4.webp',
  },
];

const FoundersAndLeadershipSection = () => {
  return (
    <>
      {/* Founders Section */}
      <section className="text-gray-800 py-12 px-4">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <img
              src="/assets/pastors.webp"
              alt="Founders"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <h2 className="text-3xl font-semibold mb-4">Meet our founders</h2>
            <p className="text-lg max-w-lg">
              Dr. Kay and Pastor May Ijisesan provide apostolic oversight over KingsWord Ministries International, the umbrella covering of KingsWord International Churches and The New churches with installations spanning North America, Europe and Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Zonal Pastor Section */}
      <section className="text-gray-800 py-12 px-4">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <img
              src="/assets/pastey.webp"
              alt="Zonal Pastor"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <h2 className="text-3xl font-semibold mb-4">Meet our Canada Zonal Pastor</h2>
            <p className="text-lg max-w-lg">
              Pastor Muyiwa Oseni is the Zonal Pastor for KingsWord Ministries in Canada. KingsWord Ministries in Canada currently spans Calgary, Toronto, and Vancouver.
            </p>
          </div>
        </div>
      </section>

      {/* Resident Pastors Section */}
      <section className="py-12 px-4 bg-gray-50 text-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12">Resident Pastors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {residentPastors.map((pastor, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center text-center"
              >
                <img
                  src={pastor.imageUrl}
                  alt={pastor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h5 className="text-xl font-bold mb-2">{pastor.name}</h5>
                  <p className="text-gray-600">{pastor.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FoundersAndLeadershipSection;
