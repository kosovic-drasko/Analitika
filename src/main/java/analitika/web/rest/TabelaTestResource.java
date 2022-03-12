package analitika.web.rest;

import analitika.domain.TabelaTest;
import analitika.repository.TabelaTestRepository;
import analitika.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link analitika.domain.TabelaTest}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TabelaTestResource {

    private final Logger log = LoggerFactory.getLogger(TabelaTestResource.class);

    private static final String ENTITY_NAME = "tabelaTest";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TabelaTestRepository tabelaTestRepository;

    public TabelaTestResource(TabelaTestRepository tabelaTestRepository) {
        this.tabelaTestRepository = tabelaTestRepository;
    }

    /**
     * {@code POST  /tabela-tests} : Create a new tabelaTest.
     *
     * @param tabelaTest the tabelaTest to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tabelaTest, or with status {@code 400 (Bad Request)} if the tabelaTest has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tabela-tests")
    public ResponseEntity<TabelaTest> createTabelaTest(@RequestBody TabelaTest tabelaTest) throws URISyntaxException {
        log.debug("REST request to save TabelaTest : {}", tabelaTest);
        if (tabelaTest.getId() != null) {
            throw new BadRequestAlertException("A new tabelaTest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TabelaTest result = tabelaTestRepository.save(tabelaTest);
        return ResponseEntity
            .created(new URI("/api/tabela-tests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tabela-tests/:id} : Updates an existing tabelaTest.
     *
     * @param id the id of the tabelaTest to save.
     * @param tabelaTest the tabelaTest to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tabelaTest,
     * or with status {@code 400 (Bad Request)} if the tabelaTest is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tabelaTest couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tabela-tests/{id}")
    public ResponseEntity<TabelaTest> updateTabelaTest(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TabelaTest tabelaTest
    ) throws URISyntaxException {
        log.debug("REST request to update TabelaTest : {}, {}", id, tabelaTest);
        if (tabelaTest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tabelaTest.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tabelaTestRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TabelaTest result = tabelaTestRepository.save(tabelaTest);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tabelaTest.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tabela-tests/:id} : Partial updates given fields of an existing tabelaTest, field will ignore if it is null
     *
     * @param id the id of the tabelaTest to save.
     * @param tabelaTest the tabelaTest to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tabelaTest,
     * or with status {@code 400 (Bad Request)} if the tabelaTest is not valid,
     * or with status {@code 404 (Not Found)} if the tabelaTest is not found,
     * or with status {@code 500 (Internal Server Error)} if the tabelaTest couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/tabela-tests/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TabelaTest> partialUpdateTabelaTest(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TabelaTest tabelaTest
    ) throws URISyntaxException {
        log.debug("REST request to partial update TabelaTest partially : {}, {}", id, tabelaTest);
        if (tabelaTest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tabelaTest.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tabelaTestRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TabelaTest> result = tabelaTestRepository
            .findById(tabelaTest.getId())
            .map(existingTabelaTest -> {
                if (tabelaTest.getBroj() != null) {
                    existingTabelaTest.setBroj(tabelaTest.getBroj());
                }
                if (tabelaTest.getIme() != null) {
                    existingTabelaTest.setIme(tabelaTest.getIme());
                }

                return existingTabelaTest;
            })
            .map(tabelaTestRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tabelaTest.getId().toString())
        );
    }

    /**
     * {@code GET  /tabela-tests} : get all the tabelaTests.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tabelaTests in body.
     */
    @GetMapping("/tabela-tests")
    public List<TabelaTest> getAllTabelaTests() {
        log.debug("REST request to get all TabelaTests");
        return tabelaTestRepository.findAll();
    }

    /**
     * {@code GET  /tabela-tests/:id} : get the "id" tabelaTest.
     *
     * @param id the id of the tabelaTest to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tabelaTest, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tabela-tests/{id}")
    public ResponseEntity<TabelaTest> getTabelaTest(@PathVariable Long id) {
        log.debug("REST request to get TabelaTest : {}", id);
        Optional<TabelaTest> tabelaTest = tabelaTestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tabelaTest);
    }

    /**
     * {@code DELETE  /tabela-tests/:id} : delete the "id" tabelaTest.
     *
     * @param id the id of the tabelaTest to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tabela-tests/{id}")
    public ResponseEntity<Void> deleteTabelaTest(@PathVariable Long id) {
        log.debug("REST request to delete TabelaTest : {}", id);
        tabelaTestRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
