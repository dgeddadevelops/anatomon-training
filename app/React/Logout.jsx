import { Form } from "@remix-run/react"

const Logout = () => (
  <Form action="/logout" method="post">
    <button
      type="submit"
      className=" absolute right-[10px] top-[10px] rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
    >
      Logout
    </button>
  </Form>
)


export default Logout