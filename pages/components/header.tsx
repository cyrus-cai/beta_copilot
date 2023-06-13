import Link from "next/link";

const HeaderComponent = () => {
  return (
    <div>
      <h2>Beta_Copilot</h2>
      <Link href="./">Go to Index Page</Link>
      <Link href="./mine">Go to My Page</Link>
    </div>
  );
};

export default HeaderComponent;
