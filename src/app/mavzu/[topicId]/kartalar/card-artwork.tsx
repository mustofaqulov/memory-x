import { getTopicIcons } from '@/lib/topic-icons';
import styles from './flashcards.module.css';

export function CardArtwork({ topicId }: { topicId: string }) {
  const [Main, First, Second] = getTopicIcons(topicId);

  return <span className={styles.artwork} aria-hidden="true">
    <span className={styles.orbitOne} />
    <span className={styles.orbitTwo} />
    <span className={styles.artworkCore}><Main size={92} strokeWidth={1.25} /></span>
    <span className={`${styles.object} ${styles.objectFirst}`}><First size={30} strokeWidth={1.55} /></span>
    <span className={`${styles.object} ${styles.objectSecond}`}><Second size={28} strokeWidth={1.55} /></span>
    <span className={styles.artworkDot} />
  </span>;
}
