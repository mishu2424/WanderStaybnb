const ArticlePage = () => {
  return (
    <div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-100 dark:text-gray-800">
      <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
        <img
          src="https://i.ibb.co/d0n2w8L3/clay-banks-PAoisp-QVHNI-unsplash.jpg"
          alt=""
          className="w-full h-60 object-cover sm:h-96 dark:bg-gray-500"
        />
        <div className="p-6 pb-12 glass m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md dark:bg-gray-50">
          <div className="space-y-2">
            <h2
              className="inline-block text-2xl font-semibold sm:text-3xl"
            >
              <span className="text-white">
                🌿 "Stay Inspired, Wander Freely -
              </span>{" "}
              Discover the World with WanderStay"
            </h2>
            <p className="text-xs dark:text-gray-600">
              By Leroy Jenkins
            </p>
          </div>
          <div className="dark:text-gray-800">
            <p>
              At WanderStay, we believe every journey begins with a feeling —
              the warmth of comfort, the thrill of discovery, and the joy of
              belonging anywhere in the world. Whether you crave the serenity of
              a lakeside cabin, the energy of a city skyline, or the charm of a
              coastal retreat, WanderStay connects you to spaces that tell a
              story. Each stay is carefully curated to offer more than just a
              place to rest — it’s an experience built around connection,
              community, and culture. From hidden local gems to modern getaways,
              every listing invites you to unwind, explore, and make memories
              that linger long after your trip ends. With a growing community of
              travelers and hosts who value authenticity and comfort, WanderStay
              transforms the way you experience travel — one meaningful stay at
              a time. So pack your curiosity, bring your spirit of adventure,
              and let WanderStay guide you to your next unforgettable escape.
              🌍✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
