export default function SignIn() {
  return (
    <main className="flex justify-center">
      <form className="my-10">
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Sign In</legend>

          <label className="fieldset-label">Email</label>
          <input type="email" className="input" placeholder="Email" />

          <label className="fieldset-label">Password</label>
          <input type="password" className="input" placeholder="Password" />

          <button className="btn btn-neutral mt-4">Sign In</button>
        </fieldset>
      </form>
    </main>
  );
}
