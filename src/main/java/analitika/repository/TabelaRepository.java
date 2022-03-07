package analitika.repository;

import analitika.domain.Tabela;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Tabela entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TabelaRepository extends JpaRepository<Tabela, Long> {}
