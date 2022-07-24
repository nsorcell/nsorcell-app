import { GetStaticProps } from "next"
import { getServerSideTranslations } from "utils/translations"

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await getServerSideTranslations(locale!)),
    },
  }
}
const ErrorPage = () => <div>ERROR</div>
export default ErrorPage
