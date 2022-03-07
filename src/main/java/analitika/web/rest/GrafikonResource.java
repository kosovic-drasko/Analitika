package analitika.web.rest;

import analitika.domain.Grafikon;
import analitika.repository.GrafikonRepository;
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
 * REST controller for managing {@link analitika.domain.Grafikon}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GrafikonResource {

    private final Logger log = LoggerFactory.getLogger(GrafikonResource.class);

    private final GrafikonRepository grafikonRepository;

    public GrafikonResource(GrafikonRepository grafikonRepository) {
        this.grafikonRepository = grafikonRepository;
    }

    /**
     * {@code GET  /grafikons} : get all the grafikons.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of grafikons in body.
     */
    @GetMapping("/grafikons")
    public List<Grafikon> getAllGrafikons() {
        log.debug("REST request to get all Grafikons");
        return grafikonRepository.findAll();
    }

    /**
     * {@code GET  /grafikons/:id} : get the "id" grafikon.
     *
     * @param id the id of the grafikon to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the grafikon, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/grafikons/{id}")
    public ResponseEntity<Grafikon> getGrafikon(@PathVariable Long id) {
        log.debug("REST request to get Grafikon : {}", id);
        Optional<Grafikon> grafikon = grafikonRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(grafikon);
    }
}
