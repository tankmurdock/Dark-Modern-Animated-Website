import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicLink,
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `CaseStudies`.
 */
export type CaseStudiesProps = SliceComponentProps<Content.CaseStudiesSlice>;

/**
 * Component for "CaseStudies" Slices.
 */
const CaseStudies = async ({
  slice,
}: CaseStudiesProps): Promise<JSX.Element> => {
  const client = createClient();
  const CaseStudies = await Promise.all(
    slice.primary.case_studies_repeat.map(async (item) => {
      if (isFilled.contentRelationship(item.case_study)) {
        return await client.getByID<Content.CaseStudyDocument>(
          item.case_study.id,
        );
      }
    }),
  );
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.heading} />;
      <PrismicRichText field={slice.primary.body} />;
      <div className="mt-20 grid gap-16">
        {CaseStudies.map(
          (caseStudy, index) =>
            caseStudy && (
              <div
                key={caseStudy.id}
                className="relative grid gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
              >
                <h3 className="4xl">
                  <PrismicText field={caseStudy.data.company} />
                </h3>
                <div className="max-w-md">
                  <PrismicRichText field={caseStudy.data.description} />
                </div>

                <PrismicNextLink
                  document={caseStudy}
                  className="after:absolute after:inset-0 hover:underline"
                >
                  Read <PrismicText field={caseStudy.data.company} /> case study
                </PrismicNextLink>
              </div>
            ),
        )}
      </div>
      ;
    </section>
  );
};

export default CaseStudies;
