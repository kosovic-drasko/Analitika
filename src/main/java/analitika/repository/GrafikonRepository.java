package analitika.repository;

import analitika.domain.Grafikon;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Grafikon entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GrafikonRepository extends JpaRepository<Grafikon, Long> {}
