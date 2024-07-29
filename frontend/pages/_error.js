import Link from "next/link";
import styled from "styled-components";
export default function Error({ statusCode }) {
  return (
    <ErrorStyleWrapper>
      <h1 className="display-1"> {statusCode && statusCode} Not found </h1>
      <Link href="/"> Back To Home </Link>
    </ErrorStyleWrapper>
  );
}
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export const ErrorStyleWrapper = styled.section`
  background: white;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #333; /*change*/

  a {
    display: block;
    text-transform: capitalize;
    color: #1452f0;
    font-size: 1.5rem;
  }
`;
