import Container from "@/components/ui/container/Container";
import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    title: "List it",
    description:
      "Add the item with a title, description, category and a photo. Choose to sell it for a price or donate it for free.",
  },
  {
    title: "Someone reserves it",
    description:
      "An interested student reserves the item. From there, you both can see each other's contact info.",
  },
  {
    title: "Arrange the handoff",
    description: "Message each other to agree on a place and time to meet up on campus.",
  },
  {
    title: "Confirm delivery",
    description:
      "After you meet in person, the lister confirms it's done and the item comes off the listings.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <Container>
        <div className={styles.header}>
          <p className={styles.eyebrow}>How it works</p>
          <h2 className={styles.title}>From listing to handoff, in 4 steps</h2>
          <p className={styles.subtitle}>
            No shipping, no middleman: just Unifor students trading with each other.
          </p>
        </div>

        <div className={styles.grid}>
          {STEPS.map((step, index) => (
            <div key={step.title} className={styles.step}>
              <span className={styles.stepNumber}>{index + 1}</span>
              <p className={styles.stepTitle}>{step.title}</p>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
