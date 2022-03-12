package analitika.repository;

import analitika.domain.TabelaTest;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TabelaTest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TabelaTestRepository extends JpaRepository<TabelaTest, Long> {}
