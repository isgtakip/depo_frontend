/*eslint-disable*/
export default async function ({ app, redirect,$axios,$gates,$auth }) {
 
  if ($auth.loggedIn) {
      const [permissions] = await Promise.all([
        $axios.get('http://localhost:8000/api/getAllPermissionsAttribute'),
      ])

      $gates.setPermissions(permissions.data)
      console.log("aaa")

    }

}