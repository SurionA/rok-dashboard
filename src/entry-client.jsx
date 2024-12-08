import { hydrateRoot } from "react-dom/client";

import App from "./client/App";

hydrateRoot(document.getElementById("app"), <App data={window?.__data__} />);
