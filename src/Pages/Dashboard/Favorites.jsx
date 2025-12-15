const Favorites = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-orange-500 mb-4">
        Favorite Meals
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 text-center">
          <img
            src="https://source.unsplash.com/200x150/?burger"
            className="rounded-md mb-2"
            alt=""
          />
          <p className="font-medium">Cheese Burger</p>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
