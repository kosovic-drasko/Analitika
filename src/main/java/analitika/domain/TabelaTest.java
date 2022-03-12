package analitika.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TabelaTest.
 */
@Entity
@Table(name = "tabela_test")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TabelaTest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "broj")
    private Integer broj;

    @Column(name = "ime")
    private String ime;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TabelaTest id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBroj() {
        return this.broj;
    }

    public TabelaTest broj(Integer broj) {
        this.setBroj(broj);
        return this;
    }

    public void setBroj(Integer broj) {
        this.broj = broj;
    }

    public String getIme() {
        return this.ime;
    }

    public TabelaTest ime(String ime) {
        this.setIme(ime);
        return this;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TabelaTest)) {
            return false;
        }
        return id != null && id.equals(((TabelaTest) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TabelaTest{" +
            "id=" + getId() +
            ", broj=" + getBroj() +
            ", ime='" + getIme() + "'" +
            "}";
    }
}
