package at.ac.fhwn.vector.models;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "offer")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(columnDefinition = "text", nullable = false)
    private String name;

    @Column(columnDefinition = "float", nullable = false)
    private Double price;

    @Column(columnDefinition = "int", nullable = false)
    private Integer durationInMinutes;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "offer_employees", joinColumns = @JoinColumn(name = "offer_id"), inverseJoinColumns = @JoinColumn(name = "employee_id"))
    private Set<Employee> employees;

}
