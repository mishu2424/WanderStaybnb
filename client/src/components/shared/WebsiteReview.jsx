import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import LoadingSpinner from "./LoadingSpinner";

const WebsiteReview = () => {
  const { user: loggedInUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient=useQueryClient();  

  const { mutateAsync: postReviewAsync, isPending } = useMutation({
    mutationKey: ["website-review"],
    mutationFn: async (reviewPost) => {
      const { data } = await axiosSecure.post(`/all-review`, reviewPost);
      return data;
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['show-reviews']})
    }
  });

  const handleReviewPost = async (e) => {
    e.preventDefault();

    if (!loggedInUser?.email) {
      // redirect to login and remember where user came from
navigate("/login", { replace: true, state: { from: location } });
      return;
    }
    const form = new FormData(e.target);
    const comment = form.get("comment");
    const rating = Number(form.get("rating-2"));
    const date = new Date().toISOString();
    try {
      const user = {
        name: loggedInUser?.displayName,
        email: loggedInUser?.email,
        photoURL: loggedInUser?.photoURL,
      };
      const reviewPost = {
        user,
        comment,
        rating,
        date,
      };
      await postReviewAsync(reviewPost);
      toast.success("Thank you for your review!!!");
      e.target.reset();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isPending) return <LoadingSpinner />;
  return (
    <Container>
      <div className="my-10">
        <form onSubmit={handleReviewPost}>
          <div>
            <div>
              <fieldset className="fieldset">
                <div className="flex items-center justify-between">
                  <legend className="fieldset-legend">
                    <div>
                      <h1 className="text-xl font-extrabold lg:text-xl 2xl:text-2xl bg-clip-text animate-gradient">
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient">
                          Leave a comment about
                        </span>

                        <span className="pl-2 text-2xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient">
                          your experience about our service:
                        </span>
                      </h1>
                    </div>
                  </legend>
                  <div className="flex items-center gap-3">
                    <label className="font-semibold">Rating:</label>
                    <div className="rating">
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        aria-label="1 star"
                        value={1}
                        defaultChecked
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        aria-label="2 star"
                        value={2}
                        //   defaultChecked
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        aria-label="3 star"
                        value={3}
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        aria-label="4 star"
                        value={4}
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        aria-label="5 star"
                        value={5}
                      />
                    </div>
                  </div>
                </div>
                <textarea
                  name="comment"
                  className="textarea h-24 w-full"
                  placeholder="Bio"
                ></textarea>
              </fieldset>
            </div>
            <button
              type="submit"
              className="btn px-8 py-2 bg-green-800 text-white my-2 w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default WebsiteReview;
