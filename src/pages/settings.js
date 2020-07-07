import Head from "~components/Navigation/Head";
import withAuthentication from "~containers/App/withAuthentication";

const Settings = () => (
  <>
    <Head title="Settings" url="u/settings" />
    <h1>Settings</h1>
  </>
);

export default withAuthentication(Settings);
